import { CheckCircle, MapPin, Milk, TrendingUp, Award, Info } from 'lucide-react';
import { Breed } from '../lib/supabase';

interface BreedResultProps {
  breed: Breed;
  confidence: number;
  alternativeMatches?: Array<{ breed: Breed; confidence: number }>;
}

export const BreedResult = ({ breed, confidence, alternativeMatches }: BreedResultProps) => {
  const characteristics = breed.characteristics || {};

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white/90 font-medium mb-1">Breed Identified Successfully!</p>
            <h2 className="text-3xl md:text-4xl font-bold">{breed.name}</h2>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{confidence.toFixed(0)}%</div>
            <div className="text-white/90 text-sm font-medium">Confidence</div>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      {/* Main Info Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold capitalize flex items-center gap-2">
            <Award className="w-4 h-4" />
            {breed.type}
          </span>
          {breed.primary_use && (
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold capitalize">
              {breed.primary_use}
            </span>
          )}
          {breed.origin_state && (
            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {breed.origin_state}
            </span>
          )}
        </div>

        {breed.description && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-bold text-gray-900">About This Breed</h3>
            </div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl">
              {breed.description}
            </p>
          </div>
        )}

        {/* Characteristics Grid */}
        {Object.keys(characteristics).length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Key Characteristics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(characteristics).map(([key, value]) => (
                <div key={key} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="text-xs font-bold text-green-700 uppercase mb-1 tracking-wide">
                    {key.replace('_', ' ')}
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Milk Yield */}
        {breed.average_milk_yield && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Milk className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Average Milk Yield</span>
            </div>
            <p className="text-gray-700 font-semibold text-lg">{breed.average_milk_yield}</p>
          </div>
        )}
      </div>

      {/* Alternative Matches */}
      {alternativeMatches && alternativeMatches.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-gray-600" />
            <h3 className="text-xl font-bold text-gray-900">Other Possible Matches</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alternativeMatches.map(({ breed: altBreed, confidence: altConfidence }) => (
              <div
                key={altBreed.id}
                className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900">{altBreed.name}</span>
                  <span className="text-sm px-2 py-1 bg-gray-200 text-gray-700 rounded-full font-semibold">
                    {altConfidence.toFixed(0)}%
                  </span>
                </div>
                <div className="text-sm text-gray-600 capitalize">{altBreed.type}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-gradient-to-r from-gray-400 to-gray-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${altConfidence}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
