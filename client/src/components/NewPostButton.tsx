const NewPostButton: React.FC = () => {
    return (
        <div className="s12">
            <article className="border">
                <div className="grid">
                    <div className="s7 left-align middle-align">
                        Do yo want to say something? Make a Post!
                    </div>
                    <div className="s5 right-align middle-align">
                        <button className="secondary small-round">
                            <i>add</i>
                            <span>New post!</span>
                        </button>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default NewPostButton
