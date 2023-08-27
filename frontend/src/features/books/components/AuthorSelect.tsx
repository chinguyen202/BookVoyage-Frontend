import React, { ChangeEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Author } from '../../../app/models';

interface AuthorMultiSelectProps {
  authorList: Author[];
  selectedAuthorIds: string[];
  onAuthorSelectionChange: (selectedIds: string[]) => void;
}

const AuthorMultiSelect: React.FC<AuthorMultiSelectProps> = ({
  authorList,
  selectedAuthorIds,
  onAuthorSelectionChange,
}) => {
  const handleAuthorSelection = (event: ChangeEvent<{ value: unknown }>) => {
    const selectedIds = event.target.value as string[];
    onAuthorSelectionChange(selectedIds);
  };

  return (
    <Form.Control
      as="select"
      multiple
      value={selectedAuthorIds}
      onChange={handleAuthorSelection}
    >
      {authorList?.map((author) => (
        <option key={author.id} value={author.id}>
          {author.fullName}
        </option>
      ))}
    </Form.Control>
  );
};

export default AuthorMultiSelect;
