import React, { useState, useEffect } from 'react'
import SocialTwitterCard from '../myComponets/SocialTwitterCard';

const SocialCards = ({ xCardId, getReactVercelTweet, searchTerm, filterLiked }) => {

    return (
        <>
            <SocialTwitterCard
                xCardId={xCardId}
                getReactVercelTweet={getReactVercelTweet}
                searchTerm={searchTerm}
                filterLiked={filterLiked}
            />
        </>
    )
}

export default SocialCards