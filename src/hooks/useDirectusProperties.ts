import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchPropertiesFromDirectus, 
  selectProperties, 
  selectPropertiesLoading, 
  selectPropertiesError,
  selectUseDirectus 
} from '@/redux/features/propertySlice';
import { AppDispatch } from '@/redux/store';

const useDirectusProperties = () => {
  const dispatch = useDispatch<AppDispatch>();
  const properties = useSelector(selectProperties);
  const loading = useSelector(selectPropertiesLoading);
  const error = useSelector(selectPropertiesError);
  const useDirectus = useSelector(selectUseDirectus);

  useEffect(() => {
    if (useDirectus) {
      dispatch(fetchPropertiesFromDirectus());
    }
  }, [dispatch, useDirectus]);

  return {
    properties,
    loading,
    error,
    useDirectus,
    refetch: () => dispatch(fetchPropertiesFromDirectus()),
  };
};

export default useDirectusProperties;