/* TODO ??? */
const Searchbar = () => {
    return (
	    <div style={{
		flexGrow: 1,
		borderRadius: '0',
	    }}>
	    <input
	style={{
            width: '100%',
            height: '24px',
        }}
        type="text"
        placeholder=":tag1:tag2:tag3:"
	    />
	    </div>
  );
}

export default Searchbar
