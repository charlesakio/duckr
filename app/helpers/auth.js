export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
        name: 'Charles Javelona',
        avatar: 'https://avatars0.githubusercontent.com/u/7959179?v=3&s=460',
        uid: 'charlesakio'
    }), 2000)
  })
}
