import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowRight } from 'lucide-react';
import LatestJobCards from './LatestJobCards';
import { Button } from '@/components/ui/button';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover exciting career opportunities from top companies. Your next big move could be just a click away!
          </p>
        </div>

        {allJobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {allJobs.slice(0, 6).map((job) => (
                <LatestJobCards key={job._id} job={job} />
              ))}
            </div>
            {allJobs.length > 6 && (
              <div className="text-center">
                <Button variant="outline" className="group">
                  View All Jobs
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-xl">No jobs available at the moment.</p>
            <p className="text-gray-400 mt-2">Check back soon for new opportunities!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;