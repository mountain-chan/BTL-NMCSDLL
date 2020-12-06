const Property = (props) => {
    const _id = props.match.params._id;

    return (
        <div>
            Property {_id}
        </div>
    );
};

export default Property;
