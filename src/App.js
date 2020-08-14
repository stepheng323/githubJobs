import React, { useState } from 'react';
import './App.css';
import { useFetchJobs } from './useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './job';
import JobPagination from './jobPagination';
import SearchForm from './searchForm';

function App() {
	const [params, setparams] = useState({});
	const [page, setPage] = useState(1);
	const { jobs, isLoading, hasNextPage, error } = useFetchJobs(params, page);

	const handleParams = (e) => {
		setPage(1);
		setparams({
			...params,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<Container className='my-4'>
			<h1 className='mb-4'>GitHub Jobs</h1>
			<SearchForm params handleParams={handleParams} />
			<JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
			{isLoading && <h1>Loading...</h1>}
			{error && (
				<h1>oops.. could not load page at this time, please try again </h1>
			)}
			{jobs.map((job) => {
				return <Job key={job.id} job={job} />;
			})}
			<JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
		</Container>
	);
}

export default App;
