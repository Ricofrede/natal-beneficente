import { render, screen } from '@testing-library/react'
import App from './App'

test('render html element with "Home" text in App', () => {
	render(<App/>)
	const homeTextEl = screen.getByText(/home/i)
	expect(homeTextEl).toBeInTheDocument()
})