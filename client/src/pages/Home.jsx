import React from 'react';
import ProductCard from '../components/ProductCard';

function Home({ addToCart }) {
  const productsData = [
    {
      id: 1,
      name: 'Adidas Backpack',
      description: 'Stylish and durable backpack for everyday use.',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1601925268030-e734cf5bdc52?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      name: 'Tommy Hilfiger Bag',
      description: 'Stylish and durable backpack for everyday use',
      price: 29.99,
      image: 'https://m.media-amazon.com/images/I/81UPIzcsOvL._AC_UY1000_.jpg'
    },
    {
      id: 3,
      name: 'Levis Backpack',
      description: 'Stylish and durable backpack for everyday use',
      price: 39.99,
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBUQERAVFRUXFRUVFRYWFxUVFRUVFxUWFxUVFRYYHSggGBolGxcWITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGBAQGisdHx0tKy0tLS0tMC0tLS0tLS0tLS0rLS0tLi0tLSsrLSstLS0tLS0tKy0tNys1LS0tLi0wLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwECBAYHBQj/xABHEAACAQIDAwcHBwoFBQAAAAAAAQIDEQQSIQUxUQYTQWFxgZEHIlKSocHRFBUyM0KisSNTYmNygrLC0uE0Q0Rz8BYko7Pi/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAJhEBAQACAQMEAQUBAAAAAAAAAAECEQMSITETMkFRYQSBscHRcf/aAAwDAQACEQMRAD8A7WAAAAAAAAAAAAAAAAAYOL2xhaTy1MRThL0XOKfhe42M4GDhtsYao8tPEUpN7kpxbfYr3M4bAAAAAAAAAAAAAAAAAAAAAAAAAAAACtgKAwsbtWjS+lNN+jGzl/bvsartLlLipTboyhThZK0oqcr63lmzJa6aW6Dnly44+aslrdyytVjCLnOSjFK8pSaUUl0tvcjQ/wDqHGWs8RFPioQT9qaPI2zKWJSWJqSqqLuotpU79GamrRl3pnO/qMfhemt32fthY6TWHzfJotqdfWPOyW+nR6cvpT04Lfde1SwlOMcsacUuCiku85e9pV8qiq1VRVkoxnlil0JKMkrGLVhOX0sz65Sv+LbM+vPpel0Xa3JLBYhPPQUJenTXNzT43jpL95NHl0MZitnNU8W5VsLujiUm5UuCrR35evW3XuWn06Tju07G/wCxe6+ItZYicVqvNb3fvNoevP8Ah0usUqsZRU4yUotXjJO6ae5prei85NsutXw6y0cROEbt5UoZLve1FRsnc9WHKjGJWdWDfF0146NG5+oxTprogNG2fyxrKT56MJxtpkThK99+raenRp2mxYDlJhqrspuEuE1l+9rG/Ve5vHlxy8VLK9cAHRAAAAAAAAFCpQqAAAAAAAAAzJJtuyWrb0SXS2ct5fcqMXVq/JMJPmoZVOclpUkm2ktfop2vx3XN35VY7JSVNb53v+yujvdvBnJ8TVvj674QpL+I8/NyavTG8Z8sTDYOnuq85J9LlVq6/eM5YDDuzWeL4xq1Y+xSsS1IqSv0mM00eXdaZMsE39DFVo9TcJL2xv7SN4XFfZxcf3qV/bmRYqpdHEdY7i2UcVBf4ikutUXd+M7IseGxktVi469DptW++ZcYqWpWtUaTJsebPZmKerxcL9DyS/DORSwldO3yyUn+jTa/GZmUG7O7MnBU1FOpIuxiQ2TiLXeMqLqsviJ4KpH/AFVWT4eb8Cee0VNtRK0rb27jdEawlVf6qp4U37ivNVV/qJ9rjS/pLK2K1MTEY2W5Mdx72B5VYvDWy11UivsVF5rXBNPze5HTeTe26eMw8MRTVr3UotpuE46Sg7dKfuOEWcnqzePJBtBQqYjDN6SqKcP2lTjmXetf3T0cOd3qs2OpgoVPUwAAAAAAAAAAAAAABHXxEKcJVKk4whFNylJqMYpb229EgNQ5V1M2JcfRhGPfdy96Oa86vlmIv0uK8M3xN72jjoVK9SrF3i52T4qKy+40nAZHVxFecV9blj2KMfezwZ3eWVdZOy/nLOxSpMwa+LvJtBYh9JnQkqTZBKci7nkXwxMeAFkMRUjrqXU9o1qjjFYetK8OcSjTlJunmcc6S+zdNX3XJamOila28kwG2cVTjBQVFZIRgm4yzOMZupDM01e0m3w1d01oaxmN8vRw+n03r8/v/SxVK7vGlha7cW8ydKd1JRUmn15WnbfZrii/alKteFKTheUc2WN7xVotOaaWW+bRdT4EXz3jFkzTi8ioxTs7vmJKUJOz1k7JN72opaWIHiZyq1K0sqlPIvNva0YqK+k227JXbbberZqzDXby3y48Ml1Z2+t/hk83GCsRVMT0IgnO5DKRzeRNOqWwVyDUlhoUTyatZE/JLGOlWlWX2aubug0mu9Jowpz0K8nl+Tbf2nJ+tJu3tE7TY+iwQYKd6UHxhF+MUTn0HIAAAAAAAAAAAAADVvKPjFTwTWdxlKdNxcU5PNCamvNW/WN3u0Td1a5tKOccoZRxzxNKpmToyw8ITj5uSVavkaWussmZX4TlvuZyvx9rI8fBYi9CHFxjd9dlc8Gms1Oy0vUquXru3ssZeyp/kYxvuTj4NoxqFlCXRlnL22fvPn3zXRBLDqKzPRdHWebiK+uhPiHXqPzKNWS6LQll7W7WMV7HxktVQfc4/E1PyLVXKquU+Ycb+Za/epr+YfMGN/N/fp/1F7fYlpYuxWWLuQ/MGO/Nffp/1F62BjPza9eH9Q7fYkjXLect0lvzDjPQS7Zx+IlsDF/oeuh2+wdbrLeeH/T2L4w9ZFr5PYv0Yv8Aej72O32LufJadS+hiy2HjF/lffp/1EEaOIhL6tu29RcZtdqi2xoevJPfYl2QvyEGui6fbFtP8CuDxUZrg1vW63cNhO9OS/WVLevInwO68m6mbB4eXGjS9kEj0jwOQlXNs+j1KcfVqSS9lj3z3Y+I50ABpAAAAAAAAAAAQ4ysoUp1G7ZYyfgtDnu0sdKlsynOnBOricSpQTu15k1GldLV3yQduM2dBx+H5yjOn6UWl29HtObbbozw2yqC0VSGIrTo9LVq0nGS7nfquceTcu/x/beLU9lp82rcZfxMkhjPk/OVI/TnOyveyiowcrLi3pfqI+TNRyoqct+ab+/LoMnaEFJZnHS76Oxe48l91a+E9HbsJ/TvH2x/sZ+Grx6JRa7bM1GpQ1vFmOq7W5memG29VasW9GW3RqdDactzZk/LZPpJ0rt71bEJGO8WuJ4yxbe9lec1uXpTb0p1b9IjTe9mBTrp8SdYroGhO6upkKqYdNr6TI54lX4E0PQrO6FCjGK1WnsPKltJrc7mJitpzlpey6i9NHpYzE03LKoxbel7buwwMDaLklpeTkl2u5j4ZecusvUrSXevBtGh2fkDC2Ag+MqjXZzkl7jYjReRc5Vnh8s5ZaNCN0pebdqandJ6uVRuOu75LPdmN6Pfh4jnQAGkAABQqAAAAAAAW1M2V5WlKzy31V7aX6rmj8tNmSbwGEinLM3SzOye6Dqzb6JZIztZb2b0Ye0sMpZK17So85OPW3SnBp90r9xjObiy6cG2HFwp82mtJTtvvbO2r6Wv2M9XEVZxgllbTu9za3vqMaVPJN24t97dy7aNeShmtHTS2q1st3ieG6tdGDUrpfSg32riR85h2tYpHn4jbMov6rTip9y+z1kUNuSc8ioyva7tPd1bjXTdDOqV6X2YrxLY4mHSvaRS2jLppy9a5b8uf5qfrL4jQz41qL3x9rJo1aPovxZ5UdovopVPWt/MU+d7fYq+s/6hpHsqrQ4Nd5dz1Di+48eO121fm6vrf/Ratrp/5VXx+MidI9mWKo8X4kNTE0n0M8yW0YdNOfeov3lixlN7qb9SI0MypOm9yfiWpR6zH+UQ9F+qiWE477P1SqzKEdUYlabUoQjrJzmkm4xbs29MzV+kycNOLasvGMfeaftGo/ldR3f1rkrvdd3NceHVUt0795KsRJUp0JwSknnunfR2Si1uVt+jd3KT6TfTnXk0+vqcObf8cLe86Ieniu8WL5VAB0QAAAAAAAAAAAgx31VT9if8LJyLExvCa/Rl+DJfA4riad6nbZkdeEZRd1dZ5ezQ9N01dz6EvaebgoqVPWVvOk/vyPmOzDnGNKnPm07ycN3COb4o8TAqUpTqz6XaKfRFPT/nWe7jqk6drU7qSlNP9HSPT2N9lmeJhqn5OPYbngqs95akXXKNlRXMXrK96IhcC9oplRRMuTAtdNPoCiXtloBInpEKJaZBNzUV53DX4Gu4zZLliFLN9ZUatwtBy9uU2N07prq/DVfgYNOV6lN8K819yojeGVnhK6v5NZrnaytrki12Znf8UdAOc+TX/EzX6l/xwOjHo4PYzl5AAdmQAAAAAAAAAACjV9OoqVjvA4zia2mVHmbOqxUI5lfWbtuv5zM2ppUl+i5ey55VD6un2N/eZ8x2X7UxlSazSerVklbLFWtlSS3Wt4HiUVZWPYqQbR52Ip2diwqEAoaQBQqQC5FpVMC5AACqRkUokETIRKJYy85LrR5eAd5w68RUt4VX7j0aa85dq/E8zZn06HXWqP8A8VY1ijqvk1/xVT/Zl/7KfwOjnO/JnD8vVfCml4zXwOhnq4PYzl5VAB2ZAAAAAAAAAAAEd4CA4ttBZalfqc195o8rZ8L0qX7PvZ7XKCNq2J/3ai++zx9jz/7en+yfNvy7JcRJJHjYh3Zn4uVzAqokKhKFWDSKFCoAoVFgBciti1F6ICJab1IrklIDIp712o8/YsL8y+F5+MbfzGfDeu0i5Pq1OPGMIrvcU37MpZ4o6f5MV51d8FSXi5/A340XyWQ/J158Zwj6sZP+Y3o9nD7Ixl5AAdWQAAUKgAAAAAAAAAcY5YKrLE42nS5vNCSqZZSUZTU5zzOLbSSild9qPB5P1c2Hpv8ARa8JNG08tJ5NpYiEItylhnWks0o35vzqajZO7lepF9NpXTTNW5L0rYWnm0ac00+hqpO6PDyYyT93tzk6J214/j/V+L0ZgTM7GvzmYcjnHnqItZJYsaKLQVsAAK2KWAJl6LLF6QFC+myj7BFEGXAj2NPXL+rpv2y/53F0SPZlk5PgoQfalf8AmE8Udi8nFHLhZv0q0n3ZYL4m1mvcg3/2NN8ZT/iaNhPfx+yOd8gANoAAAAAAAAAAAAAOV+UrDVIY9Yqm4JqgotTg53Tb1VpKz0tvNQ2CrYSNt1pPhvnJpW6DpXlNw94wnxjKL7mmvxkcw2bVthKSS3xb9rR4eXe7Py9HXcsZL8KVG7kMzInuuQuNzkyibLbE3NjKXaIWUJJIjaAC4ylVEChdFlMpWwF8ZFUWwXQV1QEtOXQXYaCy6cW323s/wMeEvOXaZ2xKM6s1ShG8pSSiutpf3bEHYOQEX830m+lzf35L3GxmNs7Bxo0YUY7oRUb8bLV9717zJPoYzUkc6AA0gAAAAAAAAAAAAA1/lxg+cwkmlrBqfdrGXsd+441sucVh4Le4xs+13fxXcfQdSmpRcZK6aaa4pqzR8+ctdi1NnVpxkpKi5ydKr9mUZNyyya+jJXas99ro83NhvvG8apWnffp1EFSukarW2pHoq+EmYlTab9N+JynFau23Txi6CJ4o1F7Sl6b8S35xn6bNejTbb/lCK88jTvnCXTJlfl8vTfiX0abblzy4jnlxNO+Xy9N+LHy+XpvxZPRptuPPLiM6NPWPl6b8WVjj5em/EelTbb41bMzKddPeaVDaMvTZlUcc/TfiZvHTbbMQ4xpzmuiLa7bae2xvfki2Rdyxcl9FZI7/AKTXnPhpGy/eOS0q8p/k1Nyc2oxirybk3ZeatXvPpHkjs54fA0KMo5ZqnF1Fe9qklmmr9NpNruOnDh3TKvYAB6mAAAAAAAAAAAAAAAAAhxGGhNWnFNdZMAPCxfJHA1Pp0IvuPHxPkt2VPfRa7JWN1BNQ257LyO7J9Cp65G/IzsrhU9b+x0YDUXbmz8i2y/1vrL4FH5Fdl8avrL4HSgXSOZvyJ7M9Kr4r4Fr8iOzPTq+K+B04DQ5dLyIbN/OVvGPwIpeQ3A9Fep4JnVgTRtyyl5EcCt9ao+5fEzqHkc2Yt6nLva950UDUXbWOT/IPAYKpztClafpPVrsb3dxsxUF0gAAAAAAAAChUChUAAAAAAAAAAAAAAAFCoAAAAAAAAAAAAAAAAAAAAAAP/9k='
    }
  ];

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Products</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {productsData.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
