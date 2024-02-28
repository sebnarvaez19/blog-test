const TagSearch: React.FC = () => {
    return (
        <>
            <div className="s12 center-align middle-align">
                <form method="POST" onSubmit={() => {}}>
                    <div className="field label prefix border round small">
                        <i>search</i>
                        <input type="text" />
                        <label>Filter by tag</label>
                    </div>
                </form>
            </div>
        </>
    )
}

export default TagSearch
