"use client"
import {
  Carousel,
  IconButton,
  Image,
} from "@chakra-ui/react";

import { useRef } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const items = ["/carousel1.webp", "/carousel2.webp", "/carousel3.webp"];

export default function HomeCarousel() {
  const playButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <Carousel.Root
      slideCount={items.length}
      allowMouseDrag
      slidesPerMove={1}
      autoplay={{ delay: 4000 }}
      loop
      onDragStatusChange={(details) =>
        !details.isDragging ? playButtonRef.current?.click() : null
      }
    >
      <Carousel.ItemGroup>
        {items.map((link, index) => (
          <Carousel.Item key={index} index={index}>
            <Image src={link} height="35rem" width="full" objectFit="cover" />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronLeft />
          </IconButton>
        </Carousel.PrevTrigger>

        <Carousel.Indicators />

        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>

        <Carousel.AutoplayTrigger asChild>
          <IconButton
            aria-label="Toggle autoplay"
            size="sm"
            display="none"
            ref={playButtonRef}
          />
        </Carousel.AutoplayTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
