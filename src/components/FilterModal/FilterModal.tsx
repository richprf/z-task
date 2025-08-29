import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import CryptoFilter from "../CrtptoFilter/CryptoFilter";
import NetworkFilter from "../NetworkFilter/NetworkFilter";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import MarketCapFilter from "../MarketCapFilter/MarketCapFilter";
import Change24hFilter from "../Change24Filter/Change24Filter";
import { CiFilter } from "react-icons/ci";

export default function FilterModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        className="bg-slate-800 rounded-lg px-4 py-2 flex gap-3"
        onClick={onOpen}
      >
        {" "}
        Filters <CiFilter className="my-auto" />{" "}
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        className="bg-black"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filtrrs</ModalHeader>
              <ModalBody>
                <CryptoFilter />
                <NetworkFilter />
                <CategoryFilter />
                <MarketCapFilter />
                <Change24hFilter />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
