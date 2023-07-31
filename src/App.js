import React from 'react'
import { Dashboard, Login, AuthWrapper, Error } from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<AuthWrapper>
				<Dashboard />
			</AuthWrapper>
		),
		errorElement: <Error />
	},
	{
		path: '/login',
		element: <Login />
	}
])

function App() {
	return <RouterProvider router={router} />
}

export default App
