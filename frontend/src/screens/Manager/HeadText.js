const HeadText = (props) => {
    return (
        <div
            style={{
                lineHeight: "50px",
                fontWeight: "bold",
                fontSize: 24,
                marginBottom: 30,
            }}>
            <div
                style={{
                    margin: "20px 40px",
                    paddingLeft: 30,
                    borderBottom: "1px solid #ddd",
                }}>
                {props.children}
            </div>
        </div>
    );
};

export default HeadText;
