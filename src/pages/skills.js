import React from 'react';
import Skill from '../components/Skill';

const Skills = () => {
    const skillsData = [
        { name: 'Python', level: 100 },
        { name: 'jQuery', level: 100 },
        { name: 'PHP', level: 100 },
        { name: 'CSS', level: 100 },
        { name: 'HTML5', level: 100 },
        { name: 'Bootstrap', level: 100 },
        { name: 'Tailwind CSS', level: 100 },
        { name: 'MySQL', level: 100 },
        { name: 'React.js', level: 80 },
    ];

    return (
        <div>
            <header>
                <h1>My <span>Skills</span></h1>
            </header>
            <section className="skills">
                {skillsData.map((skill, index) => (
                    <Skill key={index} name={skill.name} level={skill.level} />
                ))}
            </section>
        </div>
    );
};

export default Skills;