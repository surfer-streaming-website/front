import React from 'react';

const TagItem = (props) => {
    const {tag} = props.tag;
    return (
        <div>
            {tag}
        </div>
    );
};

export default TagItem;