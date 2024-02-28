type TagRowProps = {
    tag: [string, number]
}

const TagRow: React.FC<TagRowProps> = ({ tag }) => {
    return (
        <div className="s12 center-align middle-align">
            <div className="grid center-align middle-align">
                <div className="s1 left-align middle-align"/>
                <div className="s8 left-align middle-align">
                    <div className="max">{tag[0]}</div>
                </div>
                <div className="s3 right-align middle-align">
                    <a className="chip secondary">{tag[1]}</a>
                </div>
            </div>
        </div>
    )
}

export default TagRow
