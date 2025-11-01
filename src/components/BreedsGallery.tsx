import { MapPin, Award } from 'lucide-react';

export const BreedsGallery = () => {
  const breeds = [
    {
      name: 'Gir',
      type: 'Cattle',
      origin: 'Gujarat',
      image: '🐄',
      color: 'from-amber-500 to-orange-500',
      fact: 'Known for distinctive domed forehead and long pendulous ears',
    },
    {
      name: 'Sahiwal',
      type: 'Cattle',
      origin: 'Punjab',
      image: '🐄',
      color: 'from-red-500 to-pink-500',
      fact: 'Excellent milk producer with high heat tolerance',
    },
    {
      name: 'Murrah',
      type: 'Buffalo',
      origin: 'Haryana',
      image: '🐃',
      color: 'from-gray-700 to-gray-900',
      fact: 'World-famous for highest milk yield among buffalo breeds',
    },
    {
      name: 'Red Sindhi',
      type: 'Cattle',
      origin: 'Sindh',
      image: '🐄',
      color: 'from-red-600 to-red-700',
      fact: 'Heat resistant and excellent for tropical climates',
    },
    {
      name: 'Ongole',
      type: 'Cattle',
      origin: 'Andhra Pradesh',
      image: '🐄',
      color: 'from-gray-400 to-gray-600',
      fact: 'Known for massive size and draught power',
    },
    {
      name: 'Jaffarabadi',
      type: 'Buffalo',
      origin: 'Gujarat',
      image: '🐃',
      color: 'from-indigo-600 to-purple-600',
      fact: 'Heaviest of all buffalo breeds in India',
    },
  ];

  return (
    <section id="breeds" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Indian Breeds Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the rich diversity of indigenous Indian cattle and buffalo breeds, 
            each with unique characteristics and heritage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {breeds.map((breed, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
            >
              <div className={`h-48 bg-gradient-to-br ${breed.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="text-8xl transform group-hover:scale-110 transition-transform duration-300">
                  {breed.image}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-700">{breed.type}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{breed.name}</h3>
                
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">{breed.origin}</span>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 leading-relaxed">{breed.fact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
