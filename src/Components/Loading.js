import React from 'react';
import { Spinner, Button } from 'react-bootstrap';

const Loading = () => (
    <div>
        <Button variant="primary" disabled>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
        </Button>{ ' ' }
        <Button variant="primary" disabled>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            Cargando...
        </Button>
    </div>
)

export default Loading;