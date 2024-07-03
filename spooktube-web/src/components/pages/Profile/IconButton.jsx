const IconButton = ({ icon, chooseIcon }) => {
    return (
        <div className="d-flex justify-content-center">
            <img role="button" className="border border-primary border-4 rounded-circle pe-auto" src={`icon-${icon}.png`} onClick={() => { chooseIcon(icon); }} />
        </div>
    );
};
export default IconButton;