// Modules
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

// Features
import { getTypes, selectTypeList, selectTypeStatus } from '../features/typeSlice';

const TypeBar = () => {
  const dispatch = useDispatch();
  const types = useSelector(selectTypeList);
  const typeStatus = useSelector(selectTypeStatus);

  const [selectedType, setSelectedType] = useState({});

  useEffect(() => {
    if (typeStatus === 'idle') {
      dispatch(getTypes());
    }
  }, [typeStatus, dispatch]);

  return (
    <>
      <ListGroup>
        {types && types.map((type) => 
          <ListGroup.Item 
            active={type.id === selectedType.id} 
            onClick={() => setSelectedType(type)} 
            key={type.id}
            style={{ cursor: "pointer" }}
          >
            {type.name}
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
};

export default TypeBar;
