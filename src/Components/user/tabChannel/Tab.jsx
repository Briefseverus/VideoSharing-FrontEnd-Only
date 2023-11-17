import React from 'react';

const Tab = ({name, activeTab, onClick}) => {
    const className = activeTab === name ? 'active' : '';
  
    return (
      <li className={className} onClick={() => onClick(name)}>
        {name}
      </li>
    )
  }

export default Tab;
