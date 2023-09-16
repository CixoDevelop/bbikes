<?php

class response {
    public function __construct(string|array $content, bool $good = true) {
        $this->content = $content;
        $this->status = $good;
    }

    public function parse() : string {
        return json_encode([
            "content" => $this->content,
            "status" => $this->status ? "good" : "fail"
        ]);
    }

    private string|array $content;
    private bool $status;
}

?>
