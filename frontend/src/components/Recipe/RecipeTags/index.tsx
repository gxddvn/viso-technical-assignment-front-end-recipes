import { RecipeTagsInterface } from '../../../types'

const RecipeTags = ({strTags}: RecipeTagsInterface) => {
    return (
        <span className="flex items-center text-lg font-medium">Tags:
            <div className="flex items-center p-2">
                {strTags && strTags.split(',').map((tag: string) => (
                    <span key={tag} className="bg-[rgba(255,255,255,.35)] text-base rounded-md p-2 mx-2 my-1">{tag}</span>
                ))}
            </div>
        </span>
    )
}

export default RecipeTags