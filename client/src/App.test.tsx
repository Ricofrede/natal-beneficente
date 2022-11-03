import App from './App'
import {getByText, getByRole, findByText, render, screen} from '@testing-library/react'
import { describe, expect, it } from 'vitest'
// import { render, screen, userEvent } from './utils/test-utils'

describe('App test suite', () => {
	it('Should render "Projeto Natal Feliz - 2022"', () => {
		render(<App />)
		const stringQuery = screen.getByText(/Projeto Natal Feliz - 2022/i)
		expect(stringQuery).toBeTruthy()
	})

	// it('Should render "Home" button', async () => {
	// 	render(<App />)
	// 	const stringQuery = await screen.findByText(/Home/i)
	// 	expect(stringQuery).toBeTruthy()
	// })
})