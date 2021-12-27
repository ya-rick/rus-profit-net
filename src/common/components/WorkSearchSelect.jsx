import Select from './select';
import { RegularTitle } from './Typography';

export default function WorkSearchSelect({ isSearchWorker, categories, currentCategoryId, onChange, ...rest }) {
    return (
        <div {...rest}>
            <RegularTitle>
                {isSearchWorker ? 'Вакансия' : 'Кого вы ищете?'}
            </RegularTitle>
            {categories && <Select
                onItemClickCallback={onChange}
                current={currentCategoryId}
            >
                {categories}
            </Select>}
        </div>
    )
}
