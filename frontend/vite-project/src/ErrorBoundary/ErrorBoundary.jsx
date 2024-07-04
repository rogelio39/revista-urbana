import React from 'react';
import PropTypes from 'prop-types'
// Definición del ErrorBoundary
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        console.log("error en ErrorBoundary", error)
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Puedes enviar el error a un servicio de logging
        console.log("detalles del error",error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1 className='mt-40 text-center'>Algo salió mal.</h1>;
        }

        return this.props.children;
    }
}



ErrorBoundary.propTypes = {
    children : PropTypes.node.isRequired
}


export default ErrorBoundary;