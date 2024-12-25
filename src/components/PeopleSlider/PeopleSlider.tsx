import React from 'react';
import './PeopleSlider.css';
import PeopleCard from './PeopleCard/PeopleCard'
import {UserType} from '../../types/types'

interface Props{
  users : UserType[]
} 

const PeopleSlider: React.FC<Props> = ({users}) => {

  return (
    <div className="slider-container">
      {users?.map((user) => (
        <PeopleCard {...{user}} key={user.id} />
      ))}
    </div>
  );
};

export default PeopleSlider;