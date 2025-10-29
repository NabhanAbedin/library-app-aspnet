import { BookOpen, Users, Tag } from 'lucide-react';
import '../../Styles/placeholder.css';
import {motion} from 'framer-motion';

const CatalogPlaceholder = () => {
    return (
        <div className="catalog-placeholder">
            <div className="placeholder-content">
                <div className="placeholder-grid">
                    <motion.div 
                    className="placeholder-card"
                    initial ={{opacity:0, y: 30}}
                    animate = {{opacity:1, y: 0}}
                    transition ={{duration:0.3, ease: 'easeIn'}}
                    whileHover={{ scale: 1.05, y: -5, transition: { type: 'tween', duration: 0.1, ease: 'easeInOut' } }}
                    whileTap={{ scale: 0.95 }}
                    >
                        <div className="card-icon">
                            <BookOpen size={32} />
                        </div>
                        <h3>Discover Books</h3>
                        <p>Browse through thousands of titles across every genre imaginable</p>
                    </motion.div>
                    
                    <motion.div 
                    className="placeholder-card"
                    initial ={{opacity:0, y: 30}}
                    animate = {{opacity:1, y: 0}}
                    transition ={{duration:0.5, ease: 'easeIn'}}
                    whileHover={{ scale: 1.05, y: -5, transition: { type: 'tween', duration: 0.1, ease: 'easeInOut' }}}
                    whileTap={{ scale: 0.95 }}
                    >
                        <div className="card-icon">
                            <Users size={32} />
                        </div>
                        <h3>Explore Authors</h3>
                        <p>Find your favorite writers and discover new voices in literature</p>
                    </motion.div>
                    
                    <motion.div 
                    className="placeholder-card"
                    initial ={{opacity:0, y: 30}}
                    animate = {{opacity:1, y: 0}}
                    transition ={{duration:0.7, ease: 'easeIn'}}
                    whileHover={{ scale: 1.05, y: -5, transition: { type: 'tween', duration: 0.1, ease: 'easeInOut' }}}
                    whileTap={{ scale: 0.95 }}
                    >
                        <div className="card-icon">
                            <Tag size={32} />
                        </div>
                        <h3>Browse Genres</h3>
                        <p>Navigate by category to find exactly what you're looking for</p>
                    </motion.div>
                </div>
                
            </div>
        </div>
    );
};

export default CatalogPlaceholder;