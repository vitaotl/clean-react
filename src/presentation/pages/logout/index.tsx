import React, { useState } from "react"

// import { Container } from './styles';

type Props = {
  size: number
}

const Logout: React.FC<Props> = ({ size }: Props) => {
  const [index, setIndex] = useState<number>(-1)
  const cards = []
  const cards2 = [0, 1, 2]
  // for (let i = 0; i < size; i++) {
  //   cards.push(cards2[i])
  // }
  // console.log(cards)
  // console.log(cards2)

  const handleClick = (i: number): void => {
    console.log(i)

    setIndex(i)
  }

  return (
    <div
      style={{
        display: "flex",
        width: "500px",
        height: "500px",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      ola
      {/* {cards.map((card, i) => {
        return (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{ width: "100px", height: "100px", border: "1px solid red" }}
          >
            {i === index ? `UP` : `DOWN`}
          </div>
        )
      })} */}
    </div>
  )
}

export default Logout
