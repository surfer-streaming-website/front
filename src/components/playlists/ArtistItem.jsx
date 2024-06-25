import React from 'react';

const ArtistItem = (props) => {
    const {singer} = props.singer;
    return (
        <div>
            {singer}
        </div>
    );
};

export default ArtistItem;