import { IngredientTableInterface } from '../../types';

const IngredientTable = ({ingredients}: IngredientTableInterface) => {
    return (
        <table className="table-auto max-w-2xl w-80 mt-5 text-base">
            <thead>
                <tr>
                    <th className="pb-5">Ingredient</th>
                    <th className="pb-5">Measure</th>
                </tr>
            </thead>
            <tbody>
                {ingredients.map(({ ingredient, measure }) => (
                    <tr key={ingredient}>
                        <td>{ingredient}</td>
                        <td>{measure}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default IngredientTable