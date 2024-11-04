import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StarButton = ({ currentRating, targetRating, onClick, isReadOnly = false }) => {
    const isActive = currentRating >= targetRating;
    const fillColor = isActive ? '#fdd50d' : '#616161';
    const strokeColor = isActive ? '#fdd50d' : '#616161';

    return (
        <Button
            variant="icon"
            className="p-0 bg-white hover:border-transparent focus:outline-transparent disabled:opacity-100"
            onClick={() => onClick(targetRating)}
            disabled={isReadOnly}
        >
            <Star fill={fillColor} stroke={strokeColor} />
        </Button>
    );
};

export default StarButton;