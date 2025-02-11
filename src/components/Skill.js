import React from 'react';

const Skill = ({ skillName, proficiency }) => {
    return (
        <div className="skill">
            <span>{skillName}</span>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${proficiency}%` }}></div>
            </div>
        </div>
    );
};

export default Skill;