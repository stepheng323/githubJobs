import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const SearchForm = ({ handleParams, params }) => {
	return (
		<Form className='mb-2'>
      <Form.Row className="align-items-end">
			<Form.Group as={Col}>
				<Form.Label>Description</Form.Label>
				<Form.Control
					value={params.description}
					onChange={handleParams}
					type='text'
					name='description'
				></Form.Control>
			</Form.Group>

      <Form.Group as={Col}>
      <Form.Label>Location</Form.Label>
				<Form.Control
					value={params.location}
					onChange={handleParams}
					type='text'
					name='location'>
          </Form.Control>
			</Form.Group>

      <Form.Group as={Col} xs="auto" className="ml-2">
				<Form.Check
          className="mb-2"
					value={params.full_time}
					onChange={handleParams}
          type='checkbox'
          label="only Full Time"
          id="full-time"
          name='full_time'
          >
        </Form.Check>
			</Form.Group>
      </Form.Row>
		</Form>
	);
};

export default SearchForm;
