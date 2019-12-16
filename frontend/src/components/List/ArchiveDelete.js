import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArchive } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import { Button } from "react-bootstrap";

const ArchiveDelete = ( { archiveSelected, deleteSelected }) => (
  <>
    <Button
      variant="light"
      className="mr-1"
      onClick={archiveSelected}
    >
      <FontAwesomeIcon icon={faArchive} />{" "} {isMobile ? "" : "Arquivar"}
    </Button>
    <Button 
      variant="light" 
      className="mr-1" 
      onClick={deleteSelected}
    >
      <FontAwesomeIcon icon={faTrash} />{" "} {isMobile ? "" : "Apagar"}
    </Button>
  </>
);

export default ArchiveDelete;
