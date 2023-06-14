import './a.scss';

function a({href, text}) {

    return (
        <div className='formA'>
            <a href={href}>{text}</a>
        </div>
    );
}

export default a;
