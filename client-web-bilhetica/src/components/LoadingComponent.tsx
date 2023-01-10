interface Props {
    message: string;
}

const LoadingComponent = ({ message }: Props) => {
    return (
        <div className='hero  is-medium'>
            <div className='hero-body'>
                <div className='container has-text-centered'>
                    <p className='title'>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default LoadingComponent;
