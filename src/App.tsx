import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { UploadSection } from './components/UploadSection';
import { BreedsGallery } from './components/BreedsGallery';
import { HowItWorks } from './components/HowItWorks';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { BreedResult } from './components/BreedResult';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { OfflineIndicator } from './components/OfflineIndicator';
import { recognizeBreed, RecognitionResult } from './services/breedRecognition';
import { AlertCircle } from 'lucide-react';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    setApiKeyConfigured(!!apiKey);
  }, []);

  const handleImageSelect = async (imageData: string) => {
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const recognitionResult = await recognizeBreed(imageData);
      setResult(recognitionResult);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'GEMINI_API_KEY_NOT_CONFIGURED') {
          setError('Google Gemini API key not configured. Please add your API key to the .env file.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to recognize breed');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setShowUpload(false);
  };

  const handleUploadClick = () => {
    setShowUpload(true);
    setTimeout(() => {
      document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-cream-50 to-amber-50">
      <Header onUploadClick={handleUploadClick} />
      <OfflineIndicator />
      <PWAInstallPrompt />
      
      {!apiKeyConfigured && (
        <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mx-4 mt-20 rounded-lg shadow-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="font-semibold mb-1">API Key Required</p>
              <p>Please configure your Google Gemini API key in the .env file to enable breed recognition.</p>
            </div>
          </div>
        </div>
      )}

      <Hero onUploadClick={handleUploadClick} />
      
      <UploadSection
        onImageSelect={handleImageSelect}
        isProcessing={isProcessing}
        result={result}
        error={error}
        onReset={handleReset}
        showUpload={showUpload}
      />
      
      <BreedsGallery />
      <HowItWorks />
      <About />
      <Footer />
    </div>
  );
}

export default App;
