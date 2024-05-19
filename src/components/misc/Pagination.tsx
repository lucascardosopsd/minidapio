import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface LinkProps {
  href: string;
}

interface PaginateProps {
  links: LinkProps[];
  prevHref: string;
  nextHref: string;
}

const Paginate = ({ links, prevHref, nextHref }: PaginateProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={prevHref} />
        </PaginationItem>
        {links.map((link, index) => (
          <PaginationItem>
            <PaginationLink href={link.href}>{index}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href={nextHref} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginate;
