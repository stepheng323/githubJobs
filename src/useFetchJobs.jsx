import { useReducer, useEffect } from 'react';
import Axios from 'axios';

const ACTIONS = {
	MAKE_REQUEST: 'MAKE_REQUEST',
	GET_DATA: 'GET_DATA',
  ERROR: 'ERROR',
  HAS_NEXT_PAGE: 'HAS_NEXT_PAGE'
};

const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.MAKE_REQUEST:
			return { isLoading: true, jobs: [] };
		case ACTIONS.GET_DATA:
			return { ...state, isLoading: false, jobs: action.payload.jobs };
		case ACTIONS.ERROR:
      return { ...state, isLoading: false, error: action.payload.error, jobs: [] };
    case ACTIONS.HAS_NEXT_PAGE:
      return {...state, hasNextPage: action.payload.hasNextPage}
		default:
			return state;
	}
};
const CancelToken1 = Axios.CancelToken;
const CancelToken2 = Axios.CancelToken;

export const useFetchJobs = (params, page) => {
  const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json';
  const [state, dispatch] = useReducer(reducer, { jobs: [], isLoading: true, error: {} });

  const fetchJobs = async() => {
  try {
    const cancelToken1 = CancelToken1.source();
    const {data} = await Axios.get(BASE_URL, {
      cancelToken: cancelToken1.token,
      params: {markdown: true, page, ...params}
    })
    dispatch({type: ACTIONS.GET_DATA, payload: {jobs: data}}) 
  } catch (error) {
    if (Axios.isCancel(error)) return
    dispatch({type: ACTIONS.ERROR, payload: {error}})
  }
};
const fetchHasNextPage = async() => {
  try {
    const cancelToken2 = CancelToken2.source();
    const {data} = await Axios.get(BASE_URL, {
      cancelToken: cancelToken2.token,
      params: {markdown: true, page: page + 1, ...params}
    });
    dispatch({type: ACTIONS.HAS_NEXT_PAGE, payload: {hasNextPage: data.length !== 0}}) 
  } catch (error) {
    if (Axios.isCancel(error)) return
    dispatch({type: ACTIONS.ERROR, payload: {error}})
  }
}
  useEffect(()=> {
    dispatch({type: ACTIONS.MAKE_REQUEST});
    fetchJobs();
    fetchHasNextPage();

    return () => {
      CancelToken1.source().cancel()
      CancelToken2.source().cancel()
    }
  }, [params, page])

  return state;
};
