import { useState, useEffect, createContext, useContext } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GitHubContext = createContext()

export const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser)
	const [repos, setRepos] = useState(mockRepos)
	const [followers, setFollowers] = useState(mockFollowers)

	// request loading
	const [requests, setRequests] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	// error
	const [error, setError] = useState({ show: false, msg: '' })

	const searchGithubUser = async user => {
		toggleError()
		setIsLoading(true)
		try {
			const response = await axios(`${rootUrl}/users/${user}`)
			if (response) {
				setGithubUser(response.data)
				const { login, followers_url } = response.data
				// REPOS
				const { data: repos } = await axios(
					`${rootUrl}/users/${login}/repos?per_page=100`
				)
				setRepos(repos)
				// FOLLOWERS
				const { data: followers } = await axios(`${followers_url}?per_page=100`)
				setFollowers(followers)
			}
		} catch (error) {
			toggleError(true, 'there is no user with such name')
			console.log(error)
		}
		checkRequests()
		setIsLoading(false)
	}

	// check limit rate
	const checkRequests = async () => {
		try {
			const { data } = await axios(`${rootUrl}/rate_limit`)
			let {
				rate: { remaining }
			} = data
			// remaining = 0
			setRequests(remaining ?? 'could not get a data')
			if (remaining === 0) {
				toggleError(true, 'sorry, you have exceeded your hourly limit')
			}
		} catch (error) {
			console.log(error)
		}
	}
	// error

	const toggleError = (show = false, msg = '') => {
		setError({ show, msg })
	}

	useEffect(() => {
		checkRequests()
	}, [])

	return (
		<GitHubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				setGithubUser,
				setRepos,
				setFollowers,
				requests,
				error,
				searchGithubUser,
				isLoading
			}}
		>
			{children}
		</GitHubContext.Provider>
	)
}

export const useGithubContext = () => {
	return useContext(GitHubContext)
}
