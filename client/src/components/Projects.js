import React from 'react';
import styled from 'styled-components';

const StyledProjects = styled.div`
  border: 1px solid red;
  background-color: gray;
  border-radius: 8px;
  color: white;
`;

const Projects = props => {
  if (!props.projects.length) return <h3>loading</h3>;
  return (
    <StyledProjects>
      <h3>Projects</h3>
      <ul>
        {props.projects.map(p => (
          <li>{p.name}</li>
        ))}
      </ul>
    </StyledProjects>
  );
};

export default Projects;
