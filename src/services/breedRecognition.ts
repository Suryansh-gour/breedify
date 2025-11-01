import { supabase, Breed } from '../lib/supabase';

export interface RecognitionResult {
  breed: Breed;
  confidence: number;
  alternativeMatches?: Array<{ breed: Breed; confidence: number }>;
}

const analyzeImageWithAI = async (imageData: string, breeds: Breed[]): Promise<{
  identifiedBreed: string;
  confidence: number;
  reasoning: string;
  characteristics: string[];
}> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY_NOT_CONFIGURED');
  }

  const breedsList = breeds.map(b =>
    `${b.name} (${b.type}) - ${b.description?.substring(0, 100)}`
  ).join('\n');

  const base64Data = imageData.split(',')[1];
  const mimeType = imageData.split(';')[0].split(':')[1];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert in identifying Indian cattle and buffalo breeds. Analyze this image and identify the breed from this list:

${breedsList}

Respond ONLY with valid JSON in this exact format:
{
  "identifiedBreed": "exact breed name from the list",
  "confidence": number between 0-100,
  "reasoning": "brief explanation of identification",
  "characteristics": ["observed feature 1", "observed feature 2", "observed feature 3"]
}

If the image is NOT a cattle or buffalo, return confidence as 0 and identifiedBreed as "Unknown".`
                },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data
                  }
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.candidates[0].content.parts[0].text;

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const result = JSON.parse(jsonMatch[0]);

    console.log('AI Result:', result);

    return {
      identifiedBreed: result.identifiedBreed,
      confidence: Math.min(100, Math.max(0, result.confidence)),
      reasoning: result.reasoning || '',
      characteristics: result.characteristics || []
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to reach AI service');
    }
    throw error;
  }
};

export const recognizeBreed = async (imageData: string): Promise<RecognitionResult> => {
  const { data: breeds, error } = await supabase
    .from('breeds')
    .select('*');

  if (error || !breeds) {
    throw new Error('Failed to fetch breeds from database');
  }

  const aiResult = await analyzeImageWithAI(imageData, breeds);

  console.log('AI identified breed name:', aiResult.identifiedBreed);
  console.log('Available breeds:', breeds.map(b => b.name));

  const identifiedBreed = breeds.find(
    b => b.name.toLowerCase().trim() === aiResult.identifiedBreed.toLowerCase().trim()
  );

  console.log('Matched breed:', identifiedBreed);

  // SHOW SUCCESS EVEN IF IT SAYS "Red Sindhi (cattle)" - just remove the error
  if (!identifiedBreed) {
    // Try without parentheses
    const cleanedName = aiResult.identifiedBreed.replace(/\s*\([^)]*\)\s*/g, '').trim();
    const foundBreed = breeds.find(
      b => b.name.toLowerCase().trim() === cleanedName.toLowerCase()
    );
    
    if (foundBreed && aiResult.confidence >= 10) {
      // Found it! Show success instead of error
      const otherBreeds = breeds
        .filter(b => b.id !== foundBreed.id)
        .map(breed => {
          let altScore = 0;
          if (breed.type === foundBreed.type) altScore += 30;
          if (breed.origin_state === foundBreed.origin_state) altScore += 20;
          if (breed.primary_use === foundBreed.primary_use) altScore += 15;
          altScore += Math.random() * 35;
          return { breed, confidence: Math.min(aiResult.confidence - 10, altScore) };
        })
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 3);

      await supabase.from('recognition_history').insert({
        breed_id: foundBreed.id,
        confidence_score: aiResult.confidence,
        image_data: imageData.substring(0, 100),
        metadata: {
          reasoning: aiResult.reasoning,
          characteristics: aiResult.characteristics,
          alternatives: otherBreeds.length
        }
      });

      return {
        breed: foundBreed,
        confidence: aiResult.confidence,
        alternativeMatches: otherBreeds
      };
    }
  }

  if (!identifiedBreed || aiResult.confidence < 10) {
    throw new Error(`Could not identify a valid cattle or buffalo breed in the image. AI detected: "${aiResult.identifiedBreed}" with ${aiResult.confidence}% confidence. Please upload a clear image of an Indian cattle or buffalo.`);
  }

  const otherBreeds = breeds
    .filter(b => b.id !== identifiedBreed.id)
    .map(breed => {
      let altScore = 0;
      if (breed.type === identifiedBreed.type) altScore += 30;
      if (breed.origin_state === identifiedBreed.origin_state) altScore += 20;
      if (breed.primary_use === identifiedBreed.primary_use) altScore += 15;
      altScore += Math.random() * 35;
      return { breed, confidence: Math.min(aiResult.confidence - 10, altScore) };
    })
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);

  await supabase.from('recognition_history').insert({
    breed_id: identifiedBreed.id,
    confidence_score: aiResult.confidence,
    image_data: imageData.substring(0, 100),
    metadata: {
      reasoning: aiResult.reasoning,
      characteristics: aiResult.characteristics,
      alternatives: otherBreeds.length
    }
  });

  return {
    breed: identifiedBreed,
    confidence: aiResult.confidence,
    alternativeMatches: otherBreeds
  };
};

export const getAllBreeds = async (type?: 'cattle' | 'buffalo'): Promise<Breed[]> => {
  let query = supabase.from('breeds').select('*').order('name');

  if (type) {
    query = query.eq('type', type);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error('Failed to fetch breeds');
  }

  return data || [];
};
