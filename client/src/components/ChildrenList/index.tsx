import { useQuery } from 'react-query'
import { Child, getChildren } from '../../firebase/functions'
import ChildrenListItem from './ChildrenListItem'
import './styles.scss'

export default function ChildrenList() {
	const { data: children, isLoading, error } = useQuery<Child[], Error>('child', () => getChildren())

	function renderChildren() {
		if (isLoading) return [<></>]
		if (error) return [<></>]
		if (!children || !children.length) return [<></>]

		console.log(children)

		return children?.map((child) => {
			return (
			<div className="card mb-3" style={{ maxWidth: 540 }}>
				<ChildrenListItem child={child} />
			</div>
			)
		})
	}

	return (
		<div className="childrenList">
			{renderChildren()}
		</div>
	)
}
