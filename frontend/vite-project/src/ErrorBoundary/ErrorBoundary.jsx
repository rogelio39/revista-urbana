import React from 'react';
import propTypes from 'prop-types'
// Definición del ErrorBoundary
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log("error en boundari", error)
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Puedes enviar el error a un servicio de logging
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1 className='mt-40 text-center'>Algo salió mal.</h1>;
        }

        return this.props.children;
    }
}



ErrorBoundary.propTypes = {
    children : propTypes.node.isRequired
}


export default ErrorBoundary;