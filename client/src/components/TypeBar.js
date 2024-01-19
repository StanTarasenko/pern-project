// Modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { Card } from 'react-bootstrap';

// Features
import { 
  getTypes, 
  selectTypeList, 
  selectTypeStatus, 
  selectTypeId, 
  setTypeId,
} from '../features/typeSlice';

const TypeBar = () => {
  const dispatch = useDispatch();
  const types = useSelector(selectTypeList);
  const typeStatus = useSelector(selectTypeStatus);
  const typeId = useSelector(selectTypeId);

  useEffect(() => {
    if (typeStatus === 'idle') {
      dispatch(getTypes());
    }
  }, [typeStatus, dispatch]);

  const handlerForType = (type) => {
    dispatch(setTypeId(type.id));
  }; 

  const handlerRemoveTypes = () => {
    dispatch(setTypeId(0));
  };

  return (
    <>
      <ListGroup>
        {types && types.map((type) => 
          <ListGroup.Item 
            active={type.id === typeId} 
            onClick={() => handlerForType(type)} 
            key={type.id}
            style={{ cursor: "pointer" }}
          >
            {type.name}
          </ListGroup.Item>
        )}
          <Card
            style={{ 
              cursor: "pointer", 
              display: "flex", 
              marginTop: "15px",
              justifyContent: "center", 
              padding: "8px"}}
            onClick={() => handlerRemoveTypes()}  
          >
            Clear All
          </Card>
      </ListGroup>
    </>
  );
};

export default TypeBar;
