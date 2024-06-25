import React from 'react';

const TopicList = ({ topics, onTopicClick, onDeleteTopic, onEditTopic, userId }) => {

    const handleEditTopic = (topicId) => {
        onEditTopic(topicId);
    };

    const handleDeleteTopic = (topicId) => {
        onDeleteTopic(topicId);
    };

    return (
        <div>
            {topics.map((topic) => (
                <div key={topic._id} onClick={() => onTopicClick(topic._id)}>
                    <h3>{topic.title}</h3>
                    {userId === topic.userId && (
                        <div>
                            <button onClick={(e) => { e.stopPropagation(); handleEditTopic(topic._id); }}>Edit</button>
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteTopic(topic._id); }}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TopicList;
