
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "UI/UX Designer",
    "DevOps Engineer",
    "Mobile Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Popular Job Categories
                </h2>
                <Carousel 
                    className="w-full max-w-5xl mx-auto"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {categories.map((category, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-1">
                                <Button 
                                    onClick={() => searchJobHandler(category)} 
                                    variant="outline" 
                                    className="w-full rounded-full py-6 text-sm font-medium transition-all duration-200 hover:bg-purple-100 hover:text-purple-700 hover:scale-105"
                                >
                                    {category}
                                </Button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex -left-4 bg-white shadow-md hover:bg-purple-100" />
                    <CarouselNext className="hidden sm:flex -right-4 bg-white shadow-md hover:bg-purple-100" />
                </Carousel>
                <p className="text-center text-gray-600 mt-6">
                    Swipe or use arrows to explore more categories
                </p>
            </div>
        </motion.div>
    );
}

export default CategoryCarousel;