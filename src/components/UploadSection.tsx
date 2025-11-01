import { ImageUploader } from './ImageUploader';
import { BreedResult } from './BreedResult';
import { RecognitionResult } from '../services/breedRecognition';
import { Loader2, AlertCircle } from 'lucide-react';

interface UploadSectionProps {
  onImageSelect: (imageData: string) => void;
  isProcessing: boolean;
  result: RecognitionResult | null;
  error: string | null;
  onReset: () => void;
  showUpload: boolean;
}

export const UploadSection = ({
  onImageSelect,
  isProcessing,
  result,
  error,
  onReset,
  showUpload,
}: UploadSectionProps) => {
  if (!showUpload && !result) return null;

  return (
    <section id="upload" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Identify Your Breed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload a clear image of your cattle or buffalo, and our AI will identify the breed with high accuracy
            </p>
          </div>

          {!result && !isProcessing && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-xl border border-green-100">
              <ImageUploader
                onImageSelect={onImageSelect}
                isProcessing={isProcessing}
              />
            </div>
          )}

          {isProcessing && (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
              <div className="relative mb-8 inline-block">
                <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <Loader2 className="w-8 h-8 text-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Analyzing Image...</h3>
              <p className="text-gray-600">Our AI is examining the characteristics to identify the breed</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6 shadow-md">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900 mb-1">Error</p>
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <BreedResult
                breed={result.breed}
                confidence={result.confidence}
                alternativeMatches={result.alternativeMatches}
              />
              <div className="text-center">
                <button
                  onClick={onReset}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Analyze Another Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
