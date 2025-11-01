import { Heart, Target, Users, GraduationCap } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Breedify
            </h2>
            <p className="text-lg text-gray-600">
              Preserving India's indigenous cattle and buffalo heritage through AI
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                      To preserve and promote indigenous Indian breeds using cutting-edge AI technology, 
                      making breed identification accessible to farmers and enthusiasts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Purpose</h3>
                    <p className="text-gray-600">
                      Breedify aims to create awareness about indigenous breeds and support their conservation 
                      through accurate, AI-powered identification.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">For Everyone</h3>
                    <p className="text-gray-600">
                      From farmers to researchers, veterinarians to students - Breedify serves everyone 
                      interested in Indian cattle and buffalo breeds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Educational Impact</h3>
                    <p className="text-gray-600">
                      Learn about breed characteristics, origins, and unique features while contributing 
                      to the preservation of India's livestock heritage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Developed By</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    SM
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">Sachi Mishra</p>
                    <p className="text-gray-600">BCA in AI & Data Science</p>
                    <p className="text-green-600 font-medium">Sage University Bhopal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
